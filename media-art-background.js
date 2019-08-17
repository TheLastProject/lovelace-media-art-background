function setBackground(root, lovelace, app, originalStyle) {
  let hass = root.hass;
  for (let entity of lovelace.config.media_art_background.entities) {
    let entityName = entity.entity || entity;
    let entityValidStates = entity.valid_states || ['playing'];
    let entityImageAttribute = entity.image_attribute || 'entity_picture';

    let entityInfo = hass.states[entity];

    if (!entityInfo) {
      console.log(`Couldn't find entity ${entityName}`);
      continue;
    }

    if (!entityValidStates.includes(entityInfo.state)) continue;

    const backgroundUrl = entityInfo.attributes[entityImageAttribute];
    if (!backgroundUrl) continue;

    app.style.backgroundImage = `url('${backgroundUrl}')`
    app.style.backgroundRepeat = 'no-repeat';
    app.style.backgroundPosition = 'center';
    app.style.backgroundSize = 'cover';
    app.style.backgroundAttachment = 'fixed';

    return;
  }

  app.style = originalStyle;
};

let root = document.querySelector("home-assistant");
root = root.shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("app-drawer-layout partial-panel-resolver ha-panel-lovelace").shadowRoot.querySelector("hui-root");
const lovelace = root.lovelace;
const app = root.shadowRoot.querySelector("ha-app-layout");
const originalStyle = app.style;

setInterval(function() { setBackground(root, lovelace, app, originalStyle) }, 5000);
