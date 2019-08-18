function setBackground(root, lovelace, bground_elem, originalStyle) {
  let hass = root.hass;
  for (let entity of lovelace.config.media_art_background.entities) {
    let entityName = entity.entity || entity;
    let entityValidStates = entity.valid_states || ['playing'];
    let entityImageAttribute = entity.image_attribute || 'entity_picture';
    let filterBlur = lovelace.config.media_art_background.blur || '0px';

    let entityInfo = hass.states[entity];

    if (!entityInfo) {
      console.log(`Couldn't find entity ${entityName}`);
      continue;
    }

    if (!entityValidStates.includes(entityInfo.state)) continue;

    const backgroundUrl = entityInfo.attributes[entityImageAttribute];
    if (!backgroundUrl) continue;

    bground_elem.style.backgroundImage = `url('${backgroundUrl}')`
    bground_elem.style.backgroundRepeat = 'no-repeat';
    bground_elem.style.backgroundPosition = 'center';
    bground_elem.style.backgroundSize = 'cover';
    bground_elem.style.backgroundAttachment = 'fixed';
    bground_elem.style.filter = `blur(${filterBlur})`;

    return;
  }

  bground_elem.style = originalStyle;
};

let root = document.querySelector("home-assistant");
root = root.shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("app-drawer-layout partial-panel-resolver ha-panel-lovelace").shadowRoot.querySelector("hui-root");
const lovelace = root.lovelace;
const app = root.shadowRoot.querySelector("ha-app-layout");

const bground = document.createElement("div"); // create empty container for background 

bground.style.position = "absolute"; // fill entire window
bground.style.top = 0;
bground.style.left = 0;
bground.style.width = "100%";
bground.style.height = "100%";

bground.style.zIndex = -1; // below view elements

app.appendChild(bground);

const originalStyle = bground.style;

setInterval(function() { setBackground(root, lovelace, bground, originalStyle) }, 5000);
setBackground(root, lovelace, bground, originalStyle);
