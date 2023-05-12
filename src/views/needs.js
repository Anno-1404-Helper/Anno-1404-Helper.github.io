import { html, nothing } from '../lib/lit-html.js';
import { round, outputToKgPerMin, deepClone } from '../util.js';
import { icon, smallIcon } from './partials.js';

export function renderNeeds(ctx) {
  const populationSettings = ctx.settings.population;
  const consumption = ctx.settings.consumption;
  const production = ctx.settings.production;
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
    sections.push(summarizeNeeds(occident, consumption, production));
    sections.push(summarizeNeeds(orient, consumption, production));
  }

  ctx.render(needsTemplate(sections));
}

const needsTemplate = (sections) => html`<h1>Needs</h1>
  <section class="main">${sections}</section>`;

function summarizeNeeds(population, consumption, production, goods) {
  const civIndex = Object.keys(population);

  const needsByGroup = addNeeds(population, consumption);
  Object.values(needsByGroup).forEach((group) =>
    calculateTotalNeeds(group, production)
  );
  const summary = summarizeTotalNeeds(needsByGroup);

  if (summary.get('total').required === 0) {
    return null;
  }

  const needsIndex = [...summary.keys()].slice(1);

  return needsSection(civIndex, needsIndex, needsByGroup, summary);
}

function addNeeds(civ, config) {
  return Object.fromEntries(
    Object.entries(civ).map(([type, pop]) => [
      type,
      {
        type,
        pop,
        needs: Object.fromEntries(
          config[type].map((n) => [n.key, deepClone(n)])
        ),
      },
    ])
  );
}

function calculateTotalNeeds(group, production) {
  Object.values(group.needs).forEach((need) => {
    need.required = need.kgPerMinute * group.pop;
    need.chains = need.required / outputToKgPerMin(production[need.key].output);
    need.name = production[need.key].name;
  });
}

function summarizeTotalNeeds(needsByGroup) {
  const total = { required: 0 };
  const summary = new Map([['total', total]]);

  for (const { key, required, chains } of Object.values(needsByGroup).flatMap(
    (group) => Object.values(group.needs)
  )) {
    if (!summary.has(key)) {
      summary.set(key, {
        required: 0,
        chains: 0,
      });
    }

    const entry = summary.get(key);
    entry.required += required;
    entry.chains += chains;
    total.required += required;
  }

  return summary;
}

const needsSection = (
  civIndex,
  needsIndex,
  needsByGroup,
  summary
) => html`<table class="wide">
    <thead>
      <tr>
        <th>Level</th>
        ${needsIndex.map((need) => html`<th>${icon(need, 'dist')}</th>`)}
      </tr>
    </thead>
    <tbody>
      ${civIndex.map((type) => needsRow(needsIndex, needsByGroup[type]))}
    </tbody>
    <tfoot>
      <th>Total</th>
      ${needsIndex.map(
        (need) => html`<th>${needsCell(summary.get(need))}</th>`
      )}
    </tfoot>
  </table>
  <table class="narrow">
    <tbody>
      ${needsIndex.map((need) =>
        narrowRow(need, summary.get(need), needsByGroup)
      )}
    </tbody>
  </table>`;

const needsRow = (needsIndex, population) => html`<tr>
  <td>
    ${icon(population.type, 'dist')}<span class="label sub"
      >${population.population}</span
    >
  </td>
  ${needsIndex.map(
    (needType) => html`<td>${needsCell(population.needs[needType])}</td>`
  )}
</tr>`;

const needsCell = (need) =>
  !need
    ? nothing
    : html` <span class="chains">${round(need.chains, 1)}</span>
        <span class="label sub"
          >${round(need.required / 1000, 1)}&nbsp;t/min</span
        >`;

const narrowRow = (needType, { required, chains }, needsByGroup) =>
  !required
    ? nothing
    : html` <tr>
        <td>${icon(needType, 'dist')}</td>
        <td>${needsCell({ required, chains })}</td>
        <td>
          <div class="needs-grid">
            ${Object.values(needsByGroup).map((population) =>
              narrowCell(
                population.type,
                population.needs[needType]?.required,
                population.needs[needType]?.chains
              )
            )}
          </div>
        </td>
      </tr>`;

const narrowCell = (type, required, chains) =>
  !required
    ? nothing
    : html` ${smallIcon(type)}
        <span class="label">${round(chains, 1)}</span>
        <span class="label sub"
          >(${round(required / 1000, 1)}&nbsp;t/min)</span
        >`;
