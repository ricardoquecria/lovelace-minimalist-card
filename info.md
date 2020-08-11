# Lovelace Minimalist Card
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

Install on HACS using the "Custom repositories" option.


#### Setup in resources
```
resources:
  - url: /hacsfiles/lovelace-minimalist-card/minimalist-card.js
    type: js
```


#### Card options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| type | string | **required** | `custom:minimalist-card`|
| entity_main | string | **required** | example: `sensor.time` |
| color_main | string | var(--primary-text-color) | Main entity state color |
| size_main | integer | 10 | Main entity state size |
| entity_secondary | string | optional | example: `sensor.date` |
| color_secondary | string | var(--disabled-color) | Secondary entity state color |
| size__secondary | integer | 3 | Secondary entity state size |
| divider_space | integer | 5 | Space between the two entities, if any. |
| background | integer | var(--ha-card-background) | Card background color |
| position | integer | center | Set align with `center` `left` `right`|


#### Basic setup
```
type: custom:minimalist-card
entity_main: sensor.time
```

#### Example with one entity
```
type: custom:minimalist-card
entity_main: sensor.time
color_main: var(--primary-text-color)
size_main: 10
```

#### Example with two entities 
```
type: custom:minimalist-card
entity_main: sensor.time
color_main: var(--primary-text-color)
size_main: 10
entity_secondary: sensor.date
color_secondary: var(--disabled-color)
size_secondary: 3
divider_space: 5
```

Inspired by the [Bignumber Card](https://github.com/custom-cards/bignumber-card)
