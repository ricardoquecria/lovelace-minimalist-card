var input_primary = true;
var input_sec = true;
var title_text;
class MinimalistCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  setConfig(config) {
    // if (!config.entity_primary) {
    //   throw new Error('Please define the entity_primary!');
    // }
    if (!config.entity_secondary) {
      input_sec = false;
    } else {
      input_sec = true;
    }
    if (!config.entity_primary) {
      input_primary = false;
    } else {
      input_primary = true;
    }

    const root = this.shadowRoot;
    const cardConfig = Object.assign({}, config);
    if (root.lastChild) root.removeChild(root.lastChild);

    if (!cardConfig.color_primary) cardConfig.color_primary = 'var(--primary-text-color)';
    if (!cardConfig.color_secondary) cardConfig.color_secondary = 'var(--disabled-color)';
    if (!cardConfig.color_title) cardConfig.color_title = 'var(--primary-color)';

    if (!cardConfig.size_primary) cardConfig.size_primary = 10;
    if (!cardConfig.size_secondary) cardConfig.size_secondary = 3;
    if (!cardConfig.size_title) cardConfig.size_title = 3;

    if (!cardConfig.margin) cardConfig.margin = 5;
    if (!cardConfig.align) cardConfig.align = 'center';
    if (!cardConfig.background) cardConfig.background = 'var(--ha-card-background, var(--card-background-color))';

    if (!cardConfig.title_position) cardConfig.title_position = 'top';
    if (!cardConfig.title) title_text = '';

    if (!cardConfig.entity_primary) {
      cardConfig.margin = 0;
      if (!cardConfig.entity_secondary) title_text = 'Enter a title or entity_primary.';
    }

    if (cardConfig.title) title_text = cardConfig.title;

    const card = document.createElement('ha-card');
    const entityPrimary = document.createElement('div');
    entityPrimary.id = "entity-primary"
    const title = document.createElement('div');
    title.id = "title"
    title.textContent = cardConfig.title;
    const entity_sec = document.createElement('div');
    entity_sec.id = "entity-secondary"
    entity_sec.textContent = cardConfig.entity_sec;

    const style = document.createElement('style');
    cardConfig.space = (cardConfig.size_primary + cardConfig.size_secondary);
    if (config.entity_secondary) cardConfig.bottom_space = cardConfig.space / 6;

    style.textContent = `
        ha-card {
          text-align: ${cardConfig.align};
          --base-unit: 5px;
          padding: calc(var(--base-unit)*${cardConfig.space}/4) calc(var(--base-unit)*${cardConfig.space}/3);
          background: ${cardConfig.background};
        }
        #title {
          font-size: calc(var(--base-unit) * ${cardConfig.size_title});
          line-height: calc(var(--base-unit) * ${cardConfig.size_title});
          margin: ${cardConfig.margin}px 0px ${cardConfig.margin}px 0px;
          color: ${cardConfig.color_title};
				}
        #entity-primary {
          font-size: calc(var(--base-unit) * ${cardConfig.size_primary});
          line-height: calc(var(--base-unit) * ${cardConfig.size_primary});
          margin: ${cardConfig.margin}px 0px ${cardConfig.margin}px 0px;
          color: ${cardConfig.color_primary};
				}
				#entity-secondary {
					font-size: calc(var(--base-unit) * ${cardConfig.size_secondary});
          line-height: calc(var(--base-unit) * ${cardConfig.size_secondary});
          margin: ${cardConfig.margin}px 0px ${cardConfig.margin}px 0px;
          color: ${cardConfig.color_secondary};
        }`;


    if (cardConfig.title_position === 'top') {
      card.appendChild(title);
      card.appendChild(entityPrimary);
      card.appendChild(entity_sec);
    }
    if (cardConfig.title_position === 'middle') {
      card.appendChild(entityPrimary);
      card.appendChild(title);
      card.appendChild(entity_sec);
    }
    if (cardConfig.title_position === 'bottom') {
      card.appendChild(entityPrimary);
      card.appendChild(entity_sec);
      card.appendChild(title);
    }

    card.appendChild(style);
    card.addEventListener('click', event => {
      this._click('hass-more-info', { entityId: cardConfig.entity_primary });
    });
    root.appendChild(card);
    this._config = cardConfig;
  }

  _click(type, detail, options) {
    const node = this.shadowRoot;
    options = options || {};
    detail = (detail === null || detail === undefined) ? {} : detail;
    const event = new Event(type, {
      bubbles: options.bubbles === undefined ? true : options.bubbles,
      cancelable: Boolean(options.cancelable),
      composed: options.composed === undefined ? true : options.composed
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
  }


  set hass(hass) {
    const config = this._config;
    const root = this.shadowRoot;

    if (input_primary === false) {
      config.entity_primary = 'binary_sensor.updater';
    }
    if (input_sec === false) {
      config.entity_secondary = 'binary_sensor.updater';
    }

    let title = title_text;
    let entityPrimaryState = hass.states[config.entity_primary].state;
    let entitySecondaryState = hass.states[config.entity_secondary].state;
    let measurementPrimary = hass.states[config.entity_primary].attributes.unit_of_measurement || "";
    let measurementSecondary = hass.states[config.entity_secondary].attributes.unit_of_measurement || "";

    if (entityPrimaryState !== this._entityPrimaryState) {
      root.getElementById("title").textContent = `${title}`;

      if (input_primary === true) {
        root.getElementById("entity-primary").textContent = `${entityPrimaryState} ${measurementPrimary}`;
      }
      if (input_sec === true) {
        root.getElementById("entity-secondary").textContent = `${entitySecondaryState} ${measurementSecondary}`;
      }
      this._entityState = entityPrimaryState
    }
    root.lastChild.hass = hass;
  }
  getCardSize() {
    return 1;
  }
}
customElements.define('minimalist-card', MinimalistCard);