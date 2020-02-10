function setupStyle(lovelace, bgroundElem) {

  // load config entries
  let transitionOpacity = lovelace.config.media_art_background.transition_opacity || "2s"; // default -> 2 seconds
  let filterBlur = lovelace.config.media_art_background.blur || '10px'; // default -> blur 10 pixels

  // apply style to background element
  bgroundElem.style.position = "fixed"; // fill entire window
  bgroundElem.style.top = 0;
  bgroundElem.style.left = 0;
  bgroundElem.style.width = "100%";
  bgroundElem.style.height = "100%";
  bgroundElem.style.maxWidth = "100vw";
  bgroundElem.style.maxHeight = "100vh";

  bgroundElem.style.opacity = 0;
  bgroundElem.style.transition = "opacity " + transitionOpacity;

  bgroundElem.style.backgroundRepeat = 'no-repeat';
  bgroundElem.style.backgroundPosition = 'center';
  bgroundElem.style.backgroundSize = 'cover';
  bgroundElem.style.filter = `blur(${filterBlur})`;

  bgroundElem.style.zIndex = -1; // below view elements
}

function setBackground(root, appLayout, lovelace, bgroundElem) {
  const hass = root.hass;

  const viewRoot = appLayout.querySelector("hui-view");

  // load config entries
  let maxOpacity = lovelace.config.media_art_background.opacity || '1'; // default -> fully opaque

  // loop through entities from config
  for (let entity of lovelace.config.media_art_background.entities) {

    // get config attributes or default values
    let entityName = entity.entity || entity;
    let entityValidStates = entity.valid_states || ['playing'];
    let entityImageAttribute = entity.image_attribute || 'entity_picture';

    let entityInfo = hass.states[entityName];

    if (!entityInfo) {
      console.log(`Couldn't find entity ${entityName}`);
      continue;
    }

    if (!entityValidStates.includes(entityInfo.state)) continue;

    const backgroundUrl = entityInfo.attributes[entityImageAttribute];
    if (!backgroundUrl) continue;

    bgroundElem.style.backgroundImage = `url('${backgroundUrl}')`
    bgroundElem.style.opacity = maxOpacity;

    // disable user background
    viewRoot.style.backgroundImage = 'none';

    return; // abort after first element with valid background
  }

  // restore user background
  viewRoot.style.backgroundImage = '';
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
appLayout.shadowRoot.querySelector("#contentContainer").style.transform = "none";

setInterval(function () { setBackground(root, appLayout, lovelace, bgroundElem) }, 5000);
setBackground(root, appLayout, lovelace, bgroundElem);
