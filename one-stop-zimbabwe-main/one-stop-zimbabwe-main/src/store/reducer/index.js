const INITIAL_STATE = {
  name: 'hassan',
  Business_Nodes: [],
  Business_New: [],
  get_event:'fail',
  promotion_event:'fail',
  business:'fail',
  Relevant_Reveiws:[],
  Relevant_Business:[],
  Business_info:{},
  Relevant_Business_type:{},
  All_Business_Nodes_newOld:[],
  limit_controls:undefined,
  Home_Monitize:[],
  Categories_Monitize:[]
};

export default (state = INITIAL_STATE, action) => {
  if (action.type == 'Home_Monitize') {
    // console.log("old0000000000>>>>>>>>>>>>>>>>..");

    return( {
      ...state,
      Home_Monitize: action.payload,
    });
  }

 else if (action.type == 'Categories_Monitize') {
    // console.log("old0000000000>>>>>>>>>>>>>>>>..");

    return( {
      ...state,
      Categories_Monitize: action.payload,
    });
  }

  else if (action.type == 'Business_New') {
    // console.log("old>>>>>>>>>>>>>>>>>>..",action.payload);

    return {
      ...state,
      Business_New: action.payload==undefined?'':action.payload,
    };
  }


  else if (action.type == 'All_Business_Nodes_newOld') {
    // console.log("update>>>>>>>>>");

    return {
      ...state,
      All_Business_Nodes_newOld: action.payload,
    };
  }



 else if (action.type == 'get_event') {
  console.log(">>>>>>>>GEt Events>>>>>>>>>>>",action.type);
    return {
      ...state,
      get_event: action.payload==undefined?'':action.payload,
    };
  }
  else if (action.type == 'business') {
    return {
      ...state,
      business: action.payload==undefined?'':action.payload,
    };
  }
  else if (action.type == 'get_promotion_event') {
    return {
      ...state,
      promotion_event: action.payload==undefined?'':action.payload,
    };
  }

  else if (action.type == 'Relevant_Reveiws') {
    return( {
      ...state,
      Relevant_Reveiws: action.payload,
    });

   
  } 

  else if (action.type == 'Relevant_Business') {
    return( {
      ...state,
      Relevant_Business: action.payload,
    });
  }
  
  else if (action.type == 'Business_Info_review_photos') {
    return( {
      ...state,
      Business_info: action.payload,
    }); 
  }
  else if (action.type == 'Relevant_Business_type') {
    return( {
      ...state,
      Relevant_Business_type: action.payload,
    }); 
  }

  else if (action.type == 'Empty_store') {
    console.log(action);
    return( {
      ...state,
      get_event:'fail',
      promotion_event:'fail',
    }); 
  }



  else if (action.type == 'Limits') {
    return( {
      ...state,
      limit_controls: action.payload,
    }); 
  }
  return state;
};
