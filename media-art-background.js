function setupStyle(lovelace, bgroundElem) {

  // load config entries
  let transitionOpacity = lovelace.config.media_art_background.transition_opacity || "0s"; // default -> instant
  let filterBlur = lovelace.config.media_art_background.blur || '0px'; // default -> no blur

  // apply style to background element
  bgroundElem.style.position = "absolute"; // fill entire window
  bgroundElem.style.top = 0;
  bgroundElem.style.left = 0;
  bgroundElem.style.width = "100%";
  bgroundElem.style.height = "100%";

  bgroundElem.style.opacity = 0;
  bgroundElem.style.transition = "opacity " + transitionOpacity;

  bgroundElem.style.backgroundRepeat = 'no-repeat';
  bgroundElem.style.backgroundPosition = 'center';
  bgroundElem.style.backgroundSize = 'cover';
  bgroundElem.style.backgroundAttachment = 'fixed';
  bgroundElem.style.filter = `blur(${filterBlur})`;

  bgroundElem.style.zIndex = -1; // below view elements
}

function setBackground(root, lovelace, bgroundElem) {
  const hass = root.hass;

  // loop through entities from config
  for (let entity of lovelace.config.media_art_background.entities) {

    // get config attributes or default values
    let entityName = entity.entity || entity;
    let entityValidStates = entity.valid_states || ['playing'];
    let entityImageAttribute = entity.image_attribute || 'entity_picture';

    // get entity state
    let entityInfo = hass.states[entity];

    if (!entityInfo) {
      console.log(`Couldn't find entity ${entityName}`);
      continue;
    }

    if (!entityValidStates.includes(entityInfo.state)) continue;

    const backgroundUrl = entityInfo.attributes[entityImageAttribute];
    if (!backgroundUrl) continue;

    bgroundElem.style.backgroundImage = `url('${backgroundUrl}')`
    bgroundElem.style.opacity = 1;

    return; // abort after first element with valid background
  }

  setupStyle(lovelace, bgroundElem);
};

// get HA root element
let root = document.querySelector("home-assistant");
root = root.shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("app-drawer-layout partial-panel-resolver ha-panel-lovelace").shadowRoot.querySelector("hui-root");

// get constant elements from HA root element
const appLayout = root.shadowRoot.querySelector("ha-app-layout");
const lovelace = root.lovelace;

// create container element, set style and append to container
const bgroundElem = document.createElement("div"); // create empty container for background 
setupStyle(lovelace, bgroundElem);
appLayout.appendChild(bgroundElem);

setInterval(function () { setBackground(root, lovelace, bgroundElem) }, 5000);
setBackground(root, lovelace, bgroundElem);
