
var SneakersCollection = Backbone.Colection.extend({

  model: Sneakers,

  url: "https://api.parse.com/1/classes/Sneaker" + this.shoeId,

  setShoe(shoeId) {
    this.shoeId = "?&where={'objectId':" + shoeId + "}";
  },

  resetShoes() {
    this.shoeId = "";
  },

  parse(response){
    return response.results;
  }

});
