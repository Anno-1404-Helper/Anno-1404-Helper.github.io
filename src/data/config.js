export async function loadConfig(name) {
  try {
    const request = await fetch(`./src/data/${name}.json`);
    return await request.json();
  } catch (error) {
    alert(`Could not load config: ${name}`);
    throw new Error(`Could not load config: ${name}`);
  }
}
