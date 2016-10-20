import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  forms:[
    {"id":"dYHIQ","name":"Test","documentType":"TestDocument","fields":[[{"id":1,"name":"field1","label":"Field1: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":1},{"id":2,"name":"field2","label":"Field2: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":1}],[{"id":6,"name":"field6","label":"Field6: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"date","row":2},{"id":7,"name":"field7","label":"Field7: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"datetime","row":2},{"id":8,"name":"field8","label":"Field8: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"picklist","picklist":[""],"row":2}]]},
    {"id":"Pnara","name":"Account Form","documentType":"Account","fields":[[{"id":1,"name":"field1","label":"Field1: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":1},{"id":2,"name":"field2","label":"Field2: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":1},{"id":3,"name":"field3","label":"Field3: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":1}],[{"id":4,"name":"field4","label":"Field4: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"image","src":"https://steamcommunity-a.akamaihd.net/public/images/sharedfiles/steam_workshop_default_image.png","row":2}],[{"id":5,"name":"field5","label":"Field5: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"datetime","row":3},{"id":6,"name":"field6","label":"Field6: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"datetime","row":3}]]},
    {"id":"8NWGy","name":"Contact Form","documentType":"Contact","fields":[[{"id":1,"name":"field1","label":"Field1: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":1},{"id":2,"name":"field2","label":"Field2: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":1},{"id":3,"name":"field3","label":"Field3: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":1},{"id":7,"name":"field7","label":"Field7: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":1}],[{"id":8,"name":"field8","label":"Field8: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"datetime","row":2},{"id":9,"name":"field9","label":"Field9: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"image","src":"https://steamcommunity-a.akamaihd.net/public/images/sharedfiles/steam_workshop_default_image.png","row":2}],[{"id":10,"name":"field10","label":"Field10: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"picklist","picklist":[""],"row":3},{"id":11,"name":"field11","label":"Field11: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"number","row":3},{"id":12,"name":"field12","label":"Field12: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"datetime","row":3}],[{"id":13,"name":"field13","label":"Field13: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":4},{"id":14,"name":"field14","label":"Field14: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"textarea","row":4},{"id":15,"name":"field15","label":"Field15: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"picklist","picklist":[""],"row":4}]]},
    {"id":"BGOvK","name":"Test Text Form","documentType":"Text","fields":[[{"id":1,"name":"field1","label":"Field1: ","style":"","colxs":12,"colsm":12,"colmd":"8","binding":"","onChange":"","type":"paragraph","text":"Among going manor who did. Do ye is celebrated it sympathize considered. May ecstatic did surprise elegance the ignorant age. Own her miss cold last. It so numerous if he outlived disposal. How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved resolution. Hence hopes noisy may china fully and. Am it regard stairs branch thirty length afford.\n","row":1},{"id":2,"name":"field2","label":"Field2: ","style":"","colxs":12,"colsm":4,"colmd":"4","binding":"Account.Name","onChange":"doc.NumOfHouses = Number(doc.NumOfHouses + 1);","type":"text","row":"1"},{"id":3,"name":"field3","label":"Field3: ","style":"","colxs":12,"colsm":4,"colmd":"4","binding":"NumOfHouses","onChange":"","type":"text","row":"1"},{"id":4,"name":"field4","label":"Field4: ","style":"","colxs":12,"colsm":4,"colmd":"4","binding":"","onChange":"","type":"text","row":"1"}]]}
  ],
  form:{}
};

const formReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_FORMS_SUCCESS:
      return Object.assign({}, state, { forms: action.forms });

    case types.GET_FORM_SUCCESS:
      return Object.assign({}, state, { form: action.form });

  }

  return state;

}

export default formReducer;
