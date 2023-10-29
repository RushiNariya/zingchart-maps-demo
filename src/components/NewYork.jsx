import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE
import { Component } from 'react';
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ny.min.js';
import region from '../data/data';
import shortStates from '../data/states';

const listOfStates = [
  'cl',
  'fr',
  'sl',
  'je',
  'ha',
  'es',
  'wa',
  'ws',
  'he',
  'le',
  'os',
  'on',
  'fu',
  'sa',
  're',
  'al',
  'sh',
  'og',
  'cn',
  'ma',
  'oo',
  'sc',
  'mo',
  'de',
  'gr',
  'co',
  'du',
  'ul',
  'sv',
  'or',
  'pu',
  'we',
  'ro',
  'ri',
  'ki',
  'br',
  'na',
  'sf',
  'ch',
  'ca',
  'ae',
  'st',
  'ti',
  'bo',
  'er',
  'ni',
  'ol',
  'mn',
  'ge',
  'wo',
  'li',
  'ot',
  'wy',
  'se',
  'su',
  'ce',
  'to',
  'cy',
  'ct',
  'ya',
  'qu',
  'ny',
];

const colors = {
  'north country': '#EF9A9A #E57373',
  'mohawk valley': '#F48FB1 #F06292',
  'capital regoin': '#B39DDB #9575CD',
  'mid-hudson': '#90CAF9',
  'southern tier': '#80DEEA',
  'western new york': '#80CBC4',
  'fonger lakes': '#A5D6A7',
  'central new york': '#E6EE9C',
  'new york city': '#FFAB91',
  'long island': '#FFD54F',
};

var objectStates = (function (arrayOfStates) {
  var objectOfStates = {};
  for (var i = 0; i < arrayOfStates.length; i++) {
    var itemId = arrayOfStates[i];
    console.log(
      colors[
        Object.keys(region).find((reg) =>
          region[reg].find((name) => name === shortStates[itemId])
        )
      ]
    );
    objectOfStates[itemId.toUpperCase()] = {
      'background-color':
        colors[
          Object.keys(region).find((reg) =>
            region[reg].find((name) => name === shortStates[itemId])
          )
        ] || '#80CBC4',
      // alpha: 0.3,
    };
  }

  return objectOfStates;
})(listOfStates);

// const arrayOfColors = [
//   '#EF9A9A #E57373',
//   '#F48FB1 #F06292',
//   '#B39DDB #9575CD',
//   '#90CAF9 #64B5F6',
//   '#80DEEA #4DD0E1',
//   '#80CBC4 #4DB6AC',
//   '#A5D6A7 #81C784',
//   '#E6EE9C #DCE775',
//   '#FFE082 #FFD54F',
//   '#FFAB91 #FF8A65',
// ];

// var colorIndex = 0;

// function colorIndexCheck() {
//   if (colorIndex >= arrayOfColors.length) {
//     colorIndex = 0;
//   }
// }

// var objectStates = (function (arrayOfStates) {
//   var objectOfStates = {};
//   for (var i = 0; i < arrayOfStates.length; i++) {
//     var itemId = arrayOfStates[i].toUpperCase();
//     colorIndexCheck();
//     objectOfStates[itemId] = {
//       'background-color': arrayOfColors[colorIndex++],
//       alpha: 0.3,
//     };
//   }

//   return objectOfStates;
// })(listOfStates);

export default class NewYork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drilldownConfig: {
        shapes: [
          {
            //Drilldown maps.
            type: 'zingchart.maps',
            options: {
              name: 'usa_ny',

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
                // hoverState: {
                //   alpha: 0.3,
                //   backgroundColor: 'white',
                // },
                // tooltip: {
                //   alpha: 0.8,
                //   backgroundColor: 'white',
                //   borderColor: 'white',
                //   borderRadius: 3,
                //   fontColor: 'black',
                //   fontFamily: 'Georgia',
                //   fontSize: 12,
                //   textAlpha: 1,
                // },
              },
            },
          },
        ],
      },
    };
    this.areaDone = this.areaDone.bind(this);
  }

  areaDone(event) {
    if (event.shapeid == 'back_button') {
      return;
    }
  }
  render() {
    console.log(this.state);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <ZingChart
          data={this.state.drilldownConfig}
          shape_click={this.areaDone}
        />

        <div
          style={{ display: 'flex', columnGap: '1rem', alignItems: 'center' }}
        >
          <div>
            <span
              style={{
                padding: '6px 20px',
                backgroundColor: '#EF9A9A',
                marginRight: '1rem',
              }}
            ></span>{' '}
            <span>north country</span>
          </div>

          <div>
            <span
              style={{
                padding: '6px 20px',
                backgroundColor: '#F48FB1',
                marginRight: '1rem',
              }}
            ></span>{' '}
            <span>north country</span>
          </div>
          <div>
            <span
              style={{
                padding: '6px 20px',
                backgroundColor: '#B39DDB',
                marginRight: '1rem',
              }}
            ></span>{' '}
            <span>north country</span>
          </div>
          <div>
            <span
              style={{
                padding: '6px 20px',
                backgroundColor: '#90CAF9',
                marginRight: '1rem',
              }}
            ></span>{' '}
            <span>north country</span>
          </div>
        </div>
      </div>
    );
  }
}
