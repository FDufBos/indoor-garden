import { Divider, Button, Flex, Spacer, Heading } from "@chakra-ui/react";
import { SignInButton, SignUpButton } from "./layout";
import { useState, useEffect, useRef } from "react";
import { Engine, Render, World, Bodies, Composite, Runner } from "matter-js";

export default function GetStarted(props) {
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const scene = useRef();
  const engine = useRef(Engine.create());

  useEffect(() => {
    // mount
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight * 0.75;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "transparent",
        showAngleIndicator: false,
        showCollisions: false,
        showVelocity: false,
        showIds: false,
      },
    });

    // boundaries
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    ]);

    // run the engine
    Runner.run(engine);
    Render.run(render);

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render);
      World.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  const isPressed = useRef(false);

  const handleDown = () => {
    isPressed.current = true;
  };

  const handleUp = () => {
    isPressed.current = false;
  };

  const handleAddCircle = (e) => {
    var imageObj1 = new Image();
    imageObj1.src = "https://i.ibb.co/MZF3H6m/Group-6.png";
    if (isPressed.current) {
      const ball = Bodies.circle(e.clientX, 0, 40, {
        mass: 10,
        inertia: Infinity,
        inverseInertia: 0,
        friction: 0.05,
        restitution: 0.01,
        staticFriction: 0.01,
        frictionAir: 0.1,
        render: {
          sprite: {
            texture: imageObj1.src,
            xScale: 0.8,
            yScale: 0.8,
          },
        },
      });
      imageObj1.onload = function () {
        // Try to draw your image only after this function has been called.
        Composite.add(engine.current.world, [ball]);
      };
    }
  };

  return (
    <div className="flex flex-col items-stretch h-screen">
      <div
        onMouseDown={handleDown}
        onMouseUp={handleUp}
        onMouseMove={handleAddCircle}
      >
        <div className="h-3/4" ref={scene}>
          <h1 className="absolute top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl text-sun-100">
            Indoor Garden
          </h1>
        </div>
        {/* <Divider /> */}
      </div>
      <div className="flex flex-col items-center justify-center h-1/4">
        <Flex
          direction="column"
          gap="24px"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100%"
        >
          <SignUpButton
            showLoadingSpinner={showLoadingSpinner}
            setShowLoadingSpinner={setShowLoadingSpinner}
          ></SignUpButton>
          <SignInButton
            showLoadingSpinner={showLoadingSpinner}
            setShowLoadingSpinner={setShowLoadingSpinner}
          ></SignInButton>
        </Flex>
      </div>
    </div>
  );
}
