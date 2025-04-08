score = {
    "contact": {
        "values": {
            "clientName": 3,
            "nameAndCompany": 3,
            "clientSphere": 3,
            "lpr": 3,
            "meeting": 2
        }
    },
    "effectiveCommunication": {
        "values": {
            "process": 3,
            "analogs": 3,
            "issues": 3,
            "clarifyingQuestions": 3,
            "openQuestions": 3,
            "notInterrupt": 3,
            "activeListening": 3,
            "summarizeInfo": 3
        }
    },
    "presentation": {
        "values": {
            "useClientNeeds": 2,
            "answerClientQuestions": 2,
            "showBenefit": 2,
            "showHightPriceFirst": 2,
            "activeExamples": 2
        }
    },
    "convincingArguments": {
        "values": {   
            "processClientsObjections": 4,
            "askClientObjections": 4,
            "provideArguments": 4,
            "checkClientExtraQuestions": 4
        }
    },
    "resultOrientation": {
        "values": {
            "useActivePhrase": 2,
            "recordAgreements": 2,
            "setNextStep": 2,
            "offerDeal": 2,
            "clientNotReadyActions": 2,
            "buyBuy": 2
        }
    },
    "initiative": {
        "values": {
            "takesInitiative": 2,
            "equalsPosition": 2
        }
    },
    "clientOrientation": {
        "values": {
            "useClientName": 4
        }
    },
    "cpm": {
        "values": {
            "actualDeal": 4,
            "requiredFields": 4,
            "surnameField": 4,
            "positivePhrases": 4
        }
    }
}

def generate_competitions(comp):
  print(comp)
  print("-----------------------")
  print(comp["clientName"])
  print("-----------------------")
  scoreResults = {
    "contact": {
      "values": {
          "clientName": score["contact"]["values"]["clientName"] * comp["clientName"],
          "nameAndCompany": score["contact"]["values"]["nameAndCompany"] * comp["nameAndCompany"],
          "clientSphere": score["contact"]["values"]["clientSphere"] * comp["clientSphere"],
          "lpr":  score["contact"]["values"]["lpr"] * comp["lpr"],
          "meeting": score["contact"]["values"]["meeting"] * comp["meeting"]
      },
    },
    "effectiveCommunication": {
      "values": {
          "process": score["effectiveCommunication"]["values"]["process"] * comp["process"],
          "analogs": score["effectiveCommunication"]["values"]["analogs"] * comp["analogs"],
          "issues": score["effectiveCommunication"]["values"]["issues"] * comp["issues"],
          "clarifyingQuestions": score["effectiveCommunication"]["values"]["clarifyingQuestions"] * comp["clarifyingQuestions"],
          "openQuestions": score["effectiveCommunication"]["values"]["openQuestions"] * comp["openQuestions"],
          "notInterrupt": score["effectiveCommunication"]["values"]["notInterrupt"] * comp["notInterrupt"],
          "activeListening": score["effectiveCommunication"]["values"]["activeListening"] * comp["activeListening"],
          "summarizeInfo": score["effectiveCommunication"]["values"]["summarizeInfo"] * comp["summarizeInfo"]
      }
    },
    "presentation": {
      "values": {
          "useClientNeeds": score["presentation"]["values"]["useClientNeeds"] * comp["useClientNeeds"],
          "answerClientQuestions": score["presentation"]["values"]["answerClientQuestions"] * comp["answerClientQuestions"], 
          "showBenefit": score["presentation"]["values"]["showBenefit"] * comp["showBenefit"],
          "showHightPriceFirst": score["presentation"]["values"]["showHightPriceFirst"] * comp["showHightPriceFirst"],
          "activeExamples": score["presentation"]["values"]["activeExamples"] * comp["activeExamples"],
      }
    },
    "convincingArguments": {
      "values": {
          "processClientsObjections": score["convincingArguments"]["values"]["processClientsObjections"] * comp["processClientsObjections"],
          "askClientObjections": score["convincingArguments"]["values"]["askClientObjections"] * comp["askClientObjections"],
          "provideArguments": score["convincingArguments"]["values"]["provideArguments"] * comp["provideArguments"],
          "checkClientExtraQuestions": score["convincingArguments"]["values"]["checkClientExtraQuestions"] * comp["checkClientExtraQuestions"]
      }
    },
    "resultOrientation": {
      "values": {
          "useActivePhrase": score["resultOrientation"]["values"]["useActivePhrase"] * comp["useActivePhrase"],
          "recordAgreements": score["resultOrientation"]["values"]["recordAgreements"] * comp["recordAgreements"],
          "setNextStep": score["resultOrientation"]["values"]["setNextStep"] * comp["setNextStep"],
          "offerDeal": score["resultOrientation"]["values"]["offerDeal"] * comp["offerDeal"],
          "clientNotReadyActions": score["resultOrientation"]["values"]["clientNotReadyActions"] * comp["clientNotReadyActions"],
          "buyBuy": score["resultOrientation"]["values"]["buyBuy"] * comp["buyBuy"]
      }
    },
    "initiative": {
      "values": {
          "takesInitiative": score["initiative"]["values"]["takesInitiative"] * comp["takesInitiative"],
          "equalsPosition": score["initiative"]["values"]["equalsPosition"] * comp["equalsPosition"]
      }
    },
    "clientOrientation": {
      "values": {
          "useClientName": score["clientOrientation"]["values"]["useClientName"] * comp["useClientName"]
      }
    },
    "cpm": {
      "values": {
          "actualDeal": score["cpm"]["values"]["actualDeal"] * comp["actualDeal"],
          "requiredFields": score["cpm"]["values"]["requiredFields"] * comp["requiredFields"],
          "surnameField": score["cpm"]["values"]["surnameField"] * comp["surnameField"],
          "positivePhrases": score["cpm"]["values"]["positivePhrases"] * comp["positivePhrases"]
        }
    }
  }
    
  scoreResult = {
    "contact": scoreResults["contact"]["values"]["clientName"] + 
      scoreResults["contact"]["values"]["nameAndCompany"] + 
      scoreResults["contact"]["values"]["clientSphere"] + 
      scoreResults["contact"]["values"]["lpr"] + 
      scoreResults["contact"]["values"]["meeting"],
    "effectiveCommunication": scoreResults["effectiveCommunication"]["values"]["process"] + 
      scoreResults["effectiveCommunication"]["values"]["analogs"] + 
      scoreResults["effectiveCommunication"]["values"]["issues"] + 
      scoreResults["effectiveCommunication"]["values"]["clarifyingQuestions"] + 
      scoreResults["effectiveCommunication"]["values"]["openQuestions"] + 
      scoreResults["effectiveCommunication"]["values"]["notInterrupt"] + 
      scoreResults["effectiveCommunication"]["values"]["activeListening"] + 
      scoreResults["effectiveCommunication"]["values"]["summarizeInfo"],
    "presentation": scoreResults["presentation"]["values"]["useClientNeeds"] + 
      scoreResults["presentation"]["values"]["answerClientQuestions"] + 
      scoreResults["presentation"]["values"]["showBenefit"] + 
      scoreResults["presentation"]["values"]["showHightPriceFirst"] + 
      scoreResults["presentation"]["values"]["activeExamples"],
    "convincingArguments": scoreResults["convincingArguments"]["values"]["processClientsObjections"] + 
      scoreResults["convincingArguments"]["values"]["askClientObjections"] + 
      scoreResults["convincingArguments"]["values"]["provideArguments"] + 
      scoreResults["convincingArguments"]["values"]["checkClientExtraQuestions"],
    "resultOrientation": scoreResults["resultOrientation"]["values"]["useActivePhrase"] + 
      scoreResults["resultOrientation"]["values"]["recordAgreements"] + 
      scoreResults["resultOrientation"]["values"]["setNextStep"] + 
      scoreResults["resultOrientation"]["values"]["offerDeal"] + 
      scoreResults["resultOrientation"]["values"]["clientNotReadyActions"] + 
      scoreResults["resultOrientation"]["values"]["buyBuy"],
    "initiative": scoreResults["initiative"]["values"]["takesInitiative"] + 
      scoreResults["initiative"]["values"]["equalsPosition"],
    "clientOrientation": scoreResults["clientOrientation"]["values"]["useClientName"],
    "cpm": scoreResults["cpm"]["values"]["actualDeal"] + 
      scoreResults["cpm"]["values"]["requiredFields"] + 
      scoreResults["cpm"]["values"]["surnameField"] + 
      scoreResults["cpm"]["values"]["positivePhrases"] 
  }
  totalResult = sum(scoreResult.values())
  return {
    "rating": totalResult,
    "competitions": {
      "contact": {
        "rating": scoreResult["contact"],
        "values": {
          "clientName": comp["clientName"],
          "nameAndCompany": comp["nameAndCompany"],
          "clientSphere": comp["clientSphere"],
          "lpr":  comp["lpr"],
          "meeting": comp["meeting"]
        }
      },
      "effectiveCommunication": {
        "rating": scoreResult["effectiveCommunication"],
        "values": {
          "process": comp["process"],
          "analogs": comp["analogs"],
          "issues": comp["issues"],
          "clarifyingQuestions": comp["clarifyingQuestions"],
          "openQuestions": comp["openQuestions"],
          "notInterrupt": comp["notInterrupt"],
          "activeListening": comp["activeListening"],
          "summarizeInfo": comp["summarizeInfo"]
        }
      },
      "presentation": {
        "rating": scoreResult["presentation"],
        "values": {
          "useClientNeeds": comp["useClientNeeds"],
          "answerClientQuestions": comp["answerClientQuestions"],
          "showBenefit": comp["showBenefit"],
          "showHightPriceFirst": comp["showHightPriceFirst"],
          "activeExamples": comp["activeExamples"]
        }
      },
      "convincingArguments": {
        "rating": scoreResult["convincingArguments"],
        "values": {
          "processClientsObjections": comp["processClientsObjections"],
          "askClientObjections": comp["askClientObjections"],
          "provideArguments": comp["provideArguments"],
          "checkClientExtraQuestions": comp["checkClientExtraQuestions"]
        }
      },
      "resultOrientation": {
        "rating": scoreResult["resultOrientation"],
        "values": {
          "useActivePhrase": comp["useActivePhrase"],
          "recordAgreements": comp["recordAgreements"],
          "setNextStep": comp["setNextStep"],
          "offerDeal": comp["offerDeal"],
          "clientNotReadyActions": comp["clientNotReadyActions"],
          "buyBuy": comp["buyBuy"]
        }
      },
      "initiative": {
        "rating": scoreResult["initiative"],
        "values": {
          "takesInitiative": comp["takesInitiative"],
          "equalsPosition": comp["equalsPosition"]
        }
      },
      "clientOrientation": {
        "rating": scoreResult["clientOrientation"],
        "values": {
          "useClientName": comp["useClientName"]
        }
      },
      "cpm": {
        "rating": scoreResult["cpm"],
        "values": {
          "actualDeal": comp["actualDeal"],
          "requiredFields": comp["requiredFields"],
          "surnameField": comp["surnameField"],
          "positivePhrases": comp["positivePhrases"]
        }
      }
    }
  }