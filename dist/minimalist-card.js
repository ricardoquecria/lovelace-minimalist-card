var dual = true;
class MinimalistCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open'});
    }
    setConfig(config) {
      if (!config.entity_main) {
        throw new Error('Please define the entity_main!');
			}
			if (!config.entity_secondary) {
        dual = false;
			}	else {
				dual = true;
			}
      const root = this.shadowRoot;
      const cardConfig = Object.assign({}, config);
      if (root.lastChild) root.removeChild(root.lastChild);
			if (!cardConfig.color_main) cardConfig.color_main = 'var(--primary-text-color)';
			if (!cardConfig.color_secondary) cardConfig.color_secondary = 'var(--disabled-color)';
      if (!cardConfig.size_main) cardConfig.size_main = 10;
      if (!cardConfig.size_secondary) cardConfig.size_secondary = 3;
      if (!cardConfig.divider_space) cardConfig.divider_space = 5;
      if (!cardConfig.background) cardConfig.background = 'var(--ha-card-background, var(--card-background-color))';
			if (!config.entity_secondary) cardConfig.divider_space = 0;
      if (!cardConfig.from) cardConfig.from = "left";
      const card = document.createElement('ha-card');
      const content = document.createElement('div');
      content.id = "entity_main"
      const entity_sec = document.createElement('div');
      entity_sec.id = "entity_sec"
      entity_sec.textContent = cardConfig.entity_sec;
			const style = document.createElement('style');
			cardConfig.space = (cardConfig.size_main + cardConfig.size_secondary);
      style.textContent = `
        ha-card {
          text-align: center;
          --base-unit: 5px;
          padding: calc(var(--base-unit)*${cardConfig.space}/4) 0px;
          background: ${cardConfig.background};
        }
        #entity_main {
          font-size: calc(var(--base-unit) * ${cardConfig.size_main});
					line-height: calc(var(--base-unit) * ${cardConfig.size_main});
					margin-bottom: ${cardConfig.divider_space}px;
          color: ${cardConfig.color_main};
				}
				#entity_sec {
					font-size: calc(var(--base-unit) * ${cardConfig.size_secondary});
					line-height: calc(var(--base-unit) * ${cardConfig.size_secondary});
					color: ${cardConfig.color_secondary};
	
				}`;

      card.appendChild(content);
      card.appendChild(entity_sec);
      card.appendChild(style);
      card.addEventListener('click', event => {
				this._click('hass-more-info', { entityId: cardConfig.entity_main });
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
			if (dual === false) {
				config.entity_secondary = config.entity_main;
			}
			let entity_mainState = hass.states[config.entity_main].state;
			let entity_secondaryState = hass.states[config.entity_secondary].state;
			let measurement_main = hass.states[config.entity_main].attributes.unit_of_measurement || "";
			let measurement_sec = hass.states[config.entity_secondary].attributes.unit_of_measurement || "";
      if (entity_mainState !== this._entity_mainState) {
				root.getElementById("entity_main").textContent = `${entity_mainState} ${measurement_main}`;
				if (dual === true) {
          root.getElementById("entity_sec").textContent = `${entity_secondaryState} ${measurement_sec}`;
        }
        this._entityState = entity_mainState
      }
      root.lastChild.hass = hass;
    }
    getCardSize() {
      return 1;
    }
  }
  customElements.define('minimalist-card', MinimalistCard);