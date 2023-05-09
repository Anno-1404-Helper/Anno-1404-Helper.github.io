import { html, nothing } from '../lib/lit-html.js';
import { round, outputToKgPerMin } from '../util.js';
import { icon, smallIcon } from './partials.js';

export function renderNeeds(ctx) {
  const populationSettings = ctx.settings.population;
  const consumption = ctx.settings.consumption;
  const production = ctx.settings.production;
  const goods = ctx.settings.goods;
  const islandUrl = ctx.selection.island;
  const population = ctx.population[islandUrl];

  const occident = Object.fromEntries(
    Object.entries(populationSettings.ascension)
      .filter(([_, { type }]) => type === 'occident')
      .map(([k]) => [k, population[k]])
  );
  const orient = Object.fromEntries(
    Object.entries(populationSettings.ascension)
      .filter(([_, { type }]) => type === 'orient')
      .map(([k]) => [k, population[k]])
  );

  const sections = [];
  if (population) {
    sections.push(summarizeNeeds(occident, consumption, production, goods));
    sections.push(summarizeNeeds(orient, consumption, production, goods));
  }

  ctx.render(needsTemplate(sections));
}

const needsTemplate = (sections) => html`<h1>Needs</h1>
  <section class="main">${sections}</section>`;

function summarizeNeeds(population, consumption, production, goods) {
  const needs = getNeeds(population, consumption);
  needs.forEach(calculateTotalNeeds);

  const summary = summarizeTotalNeeds(needs);
  needs.forEach(
    (need) =>
      (need.index = Object.fromEntries(need.needs.map((x) => [x.key, x.total])))
  );

  if (summary.get('total') === 0) {
    return null;
  }

  const index = [...summary.keys()].slice(1);

  return needsSection(index, needs, summary, production, goods);
}

function getNeeds(group, config) {
  return Object.entries(group).map(([type, population]) => ({
    type,
    population,
    needs: config[type],
  }));
}

function calculateTotalNeeds(group) {
  group.needs.forEach(
    (need) => (need.total = need.kgPerMinute * group.population)
  );
}

function summarizeTotalNeeds(population) {
  const summary = new Map([['total', 0]]);

  for (const { key, total } of population.flatMap((group) => group.needs)) {
    if (!summary.has(key)) {
      summary.set(key, 0);
    }

    summary.set(key, summary.get(key) + total);
    summary.set('total', summary.get('total') + total);
  }

  return summary;
}

const needsSection = (index, needs, summary, production, goods) => html`<table
    class="wide"
  >
    <thead>
      <tr>
        <th>Level</th>
        ${index.map(
          (need) =>
            html`<th>
              <abbr title="${goods[need].name}">${icon(need, 'dist')}</abbr>
            </th>`
        )}
      </tr>
    </thead>
    <tbody>
      ${needs.map(needsRow.bind(null, index, production))}
    </tbody>
    <tfoot>
      <th>Total</th>
      ${index.map(
        (need) =>
          html`<th>
            ${needsCell(
              summary.get(need),
              outputToKgPerMin(production[need].output)
            )}
          </th>`
      )}
    </tfoot>
  </table>
  <table class="narrow">
    <tbody>
      ${index.map((need) =>
        narrowRow(
          need,
          summary.get(need),
          outputToKgPerMin(production[need].output),
          needs
        )
      )}
    </tbody>
  </table>`;

const needsRow = (index, production, population) => html`<tr>
  <td>
    ${icon(population.type, 'dist')}<span class="label sub"
      >${population.population}</span
    >
  </td>
  ${index.map(
    (need) =>
      html`<td>
        ${needsCell(
          population.index[need],
          outputToKgPerMin(production[need].output)
        )}
      </td>`
  )}
</tr>`;

const needsCell = (value, rate) =>
  !value
    ? nothing
    : html`<span class="chains">${round(value / rate, 1)}</span
        ><span class="label sub">${round(value / 1000, 1)} t/min</span>`;

const narrowRow = (name, total, rate, pop) =>
  !total
    ? nothing
    : html` <tr>
        <td>${icon(name, 'dist')}</td>
        <td>${needsCell(total, rate)}</td>
        <td>
          <div class="needs-grid">
            ${pop
              .map((population) => [population.type, population.index[name]])
              .map(([type, value]) => narrowCell(type, value, rate))}
          </div>
        </td>
      </tr>`;

const narrowCell = (type, value, rate) =>
  !value
    ? nothing
    : html` ${smallIcon(type)}
        <span class="label">${round(value / rate, 1)}</span>
        <span class="label sub">(${round(value / 1000, 1)} t/min)</span>`;
