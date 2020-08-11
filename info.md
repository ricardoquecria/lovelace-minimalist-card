# Lovelace Minimalist Card
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

![Cards](/docs/imgs/cards.gif)


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
![Cards](/docs/imgs/demo_basic.png)


#### Example with one entity
```
type: custom:minimalist-card
entity_main: sensor.time
color_main: var(--primary-color)
size_main: 12
```
![Cards](/docs/imgs/demo_color.png)


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
position: center
```
![Cards](/docs/imgs/demo_center.png)


#### Examples of positions
```
type: custom:minimalist-card
entity_main: sensor.time
entity_secondary: sensor.date
position: left
```
![Cards](/docs/imgs/demo_left.png)

```
type: custom:minimalist-card
entity_main: sensor.time
entity_secondary: sensor.date
position: right
```
![Cards](/docs/imgs/demo_right.png)


#### Examples with background color
```
type: custom:minimalist-card
entity_main: sensor.time
entity_secondary: sensor.date
background: var(primary-color)
# Accepts hex, rgb, rgba and background image
```
![Cards](/docs/imgs/demo_bg.png)



Inspired by the [Bignumber Card](https://github.com/custom-cards/bignumber-card)
