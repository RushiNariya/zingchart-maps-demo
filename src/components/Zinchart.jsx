import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE
import { Component } from 'react';
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ny.min.js';

const listOfStates = [
  'al',
  'ak',
  'az',
  'ar',
  'ca',
  'co',
  'ct',
  'de',
  'dc',
  'fl',
  'ga',
  'hi',
  'id',
  'il',
  'in',
  'ia',
  'ks',
  'ky',
  'la',
  'me',
  'md',
  'ma',
  'mi',
  'mn',
  'ms',
  'mo',
  'mt',
  'ne',
  'nv',
  'nh',
  'nj',
  'nm',
  'ny',
  'nc',
  'nd',
  'oh',
  'ok',
  'or',
  'pa',
  'ri',
  'sc',
  'sd',
  'tn',
  'tx',
  'ut',
  'vt',
  'va',
  'wa',
  'wv',
  'wi',
  'wy',
];

const arrayOfColors = [
  '#EF9A9A #E57373',
  '#F48FB1 #F06292',
  '#B39DDB #9575CD',
  '#90CAF9 #64B5F6',
  '#80DEEA #4DD0E1',
  '#80CBC4 #4DB6AC',
  '#A5D6A7 #81C784',
  '#E6EE9C #DCE775',
  '#FFE082 #FFD54F',
  '#FFAB91 #FF8A65',
];
var colorIndex = 0;

function colorIndexCheck() {
  if (colorIndex >= arrayOfColors.length) {
    colorIndex = 0;
  }
}

var objectStates = (function (arrayOfStates) {
  var objectOfStates = {};
  for (var i = 0; i < arrayOfStates.length; i++) {
    var itemId = arrayOfStates[i].toUpperCase();
    colorIndexCheck();
    objectOfStates[itemId] = {
      'background-color': arrayOfColors[colorIndex++],
      alpha: 0.3,
    };
  }

  return objectOfStates;
})(listOfStates);

export default class Zingchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapeId: '',
      newMapId: '',
      config: {
        shapes: [
          {
            type: 'zingchart.maps',
            options: {
              name: 'usa',
              zooming: false,
              panning: false,
              scrolling: false,
              style: {
                controls: {
                  visible: false,
                },
                fillType: 'radial',
                cursor: 'pointer',

                items: objectStates,
              },
            },
          },
        ],
      },
      drilldownConfig: {
        shapes: [
          {
            //Drilldown maps.
            type: 'zingchart.maps',
            options: {
              name: '',

              zooming: false,
              panning: false,
              scrolling: false,

              style: {
                controls: {
                  visible: false,
                },
                // backgroundColor: 'pink',
                hoverState: {
                  alpha: 0.3,
                  backgroundColor: 'white',
                },
                tooltip: {
                  alpha: 0.8,
                  backgroundColor: 'white',
                  borderColor: 'white',
                  borderRadius: 3,
                  fontColor: 'black',
                  fontFamily: 'Georgia',
                  fontSize: 12,
                  textAlpha: 1,
                },
              },
            },
          },
          {
            //Button to go back to main map.
            id: 'back_button',
            type: 'rectangle',
            height: 25,
            width: 40,
            x: 20,
            y: 20,

            backgroundColor: '#C4C4C4',
            borderRadius: 3,
            cursor: 'hand',
            hoverState: {
              alpha: 0.3,
              backgroundColor: 'white',
            },
            label: {
              text: 'Back',
            },
          },
        ],
      },
    };
    this.chartDone = this.chartDone.bind(this);
    this.areaDone = this.areaDone.bind(this);
    this.dynamicIMportFile = this.dynamicIMportFile.bind(this);
  }

  async dynamicIMportFile(stateCode) {
    switch (stateCode) {
      case 'NY':
        await import('zingchart/modules-es6/zingchart-maps-usa_ny.min.js');
        break;
      case 'CA':
        await import('zingchart/modules-es6/zingchart-maps-usa_ca.min.js');
        break;

      default:
        '';
    }
  }

  hasDrilldownData(newMapId) {
    let drillDownCountries = listOfStates.map(function (curVal) {
      return 'usa_' + curVal;
    });
    for (let i = 0; i < drillDownCountries.length; i++) {
      if (newMapId === drillDownCountries[i]) return true;
    }

    return false;
  }

  async chartDone(event) {
    if (event.shapeid === 'back_button') {
      return;
    }
    let shapeId = event.shapeid;
    let newMapId = 'usa_' + String(event.shapeid).toLowerCase();
    await this.dynamicIMportFile(shapeId);

    this.setState({
      shapeId: shapeId,
      newMapId: newMapId,
    });

    if (this.hasDrilldownData(newMapId)) {
      // console.log('called');
      this.setState({
        drilldownConfig: {
          shapes: [
            {
              //Drilldown maps.
              type: 'zingchart.maps',
              options: {
                name: newMapId,

                zooming: false,
                panning: false,
                scrolling: false,

                style: {
                  controls: {
                    visible: false,
                  },
                  // backgroundColor: 'pink',
                  hoverState: {
                    alpha: 0.3,
                    backgroundColor: 'white',
                  },
                  tooltip: {
                    alpha: 0.8,
                    backgroundColor: 'white',
                    borderColor: 'white',
                    borderRadius: 3,
                    fontColor: 'black',
                    fontFamily: 'Georgia',
                    fontSize: 12,
                    textAlpha: 1,
                  },
                },
              },
            },
            {
              //Button to go back to main map.
              id: 'back_button',
              type: 'rectangle',
              height: 25,
              width: 40,
              x: 20,
              y: 20,

              backgroundColor: '#C4C4C4',
              borderRadius: 3,
              cursor: 'hand',
              hoverState: {
                alpha: 0.3,
                backgroundColor: 'white',
              },
              label: {
                text: 'Back',
              },
            },
          ],
        },
      });
    }

    // console.log(`Event "Complete" - The chart is rendered\n`, event);
  }

  areaDone(event) {
    console.log(event);

    if (event.shapeid == 'back_button') {
      // since we are using setdata, reload will reload the original chartJSON
      this.setState({
        shapeId: '',
        newMapId: '',
      });
      return;
    }
  }
  render() {
    console.log(this.state);
    if (!this.state.shapeId) {
      return (
        <ZingChart data={this.state.config} shape_click={this.chartDone} />
      );
    }
    return (
      <ZingChart
        data={this.state.drilldownConfig}
        shape_click={this.areaDone}
      />
    );
  }
}
