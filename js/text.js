(function (Blotter) {
  Blotter.LiquidDistortMaterial = function () {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.LiquidDistortMaterial.prototype = Object.create(
    Blotter.Material.prototype
  );

  Blotter._extendWithGettersSetters(
    Blotter.LiquidDistortMaterial.prototype,
    (function () {
      function _mainImageSrc() {
        var mainImageSrc = [Blotter.Assets.Shaders.Noise3D].join("\n");

        return mainImageSrc;
      }

      return {
        constructor: Blotter.LiquidDistortMaterial,

        init: function () {
          this.mainImage = _mainImageSrc();
          this.uniforms = {
            uSpeed: { type: "1f", value: 1.0 },
            uVolatility: { type: "1f", value: 0.15 },
            uSeed: { type: "1f", value: 0.1 },
          };
        },
      };
    })()
  );
})(this.Blotter);

// BLOTTER - Example 1
const text = new Blotter.Text("Welcome", {
  family: "'EB Garamond', serif",
  size: 80,
  fill: "black",
  paddingLeft: 100,
  paddingRight: 100,
  paddingTop: 100,
  paddingBottom: 100,
});

var material = new Blotter.LiquidDistortMaterial();

material.uniforms.uSpeed.value = 0.1;

const blotter = new Blotter(material, {
  texts: text,
});

const elem = document.getElementById("text");
const scope = blotter.forText(text);

scope.appendTo(elem);

document.addEventListener("mousemove", function (e) {
  material.uniforms.uVolatility.value = e.clientX * 0.0005;
});
