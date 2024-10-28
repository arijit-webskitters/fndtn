document.addEventListener("DOMContentLoaded", () => {
    function dropMatter(matterContainer, circleClass) {
        if (matterContainer != undefined) {
            // module aliases
            var Engine = Matter.Engine,
                Render = Matter.Render,
                Runner = Matter.Runner,
                Bodies = Matter.Bodies,
                Composite = Matter.Composite,
                Body = Matter.Body,
                Svg = Matter.Svg,
                Vector = Matter.Vector,
                Vertices = Matter.Vertices;

            const SVG_CIRCLE_WIDTH = 0.15;
            var size = { w: matterContainer.clientWidth, h: matterContainer.clientHeight, offset: 100 };

            // create an engine
            var engine = Engine.create();

            // create a renderer
            var render = Render.create({
                element: matterContainer,
                engine: engine,
                options: {
                    width: size.w,
                    height: size.h,
                    background: "transparent",
                    wireframes: false,
                    showAngleIndicator: false,
                    pixelRatio: window.devicePixelRatio
                }
            });

            createshapes();
            // var ceiling = Bodies.rectangle(size.w / 2, -size.offset * 20, 50000, size.offset, { isStatic: true, label: "wall" }
            // );
            var ground = Bodies.rectangle(size.w / 2, (size.h + size.offset / 2) - 1, 50000, size.offset, { isStatic: true, label: "wall", render: { opacity: 0 } }
            );
            let leftWall = Bodies.rectangle(0 - size.offset / 2, size.h / 2, size.offset, size.h * 5, { isStatic: true, label: "wall", render: { opacity: 0 } }
            );
            let rightWall = Bodies.rectangle(size.w + size.offset / 2, size.h / 2, size.offset, size.h * 5, { isStatic: true, label: "wall", render: { opacity: 0 } }
            );

            // add all of the bodies to the world
            Composite.add(engine.world, [ground, leftWall, rightWall]);

            // engine.world.gravity.y = 0.05;

            //render
            Render.run(render);
            var runner = Runner.create();
            Runner.run(runner, engine);

            //create shape
            function createshapes() {
                const cr_paths = matterContainer.querySelectorAll(circleClass);
                if (cr_paths.length) {
                    cr_paths.forEach((e, i) => {
                        let circleDiameter = size.w * SVG_CIRCLE_WIDTH;
                        let scaleSize = circleDiameter / e.width;
                        let scale = Math.min(scaleSize, scaleSize);
                        console.log('cd', circleDiameter);
                        console.log('e.w', e.width);

                        let circle = Bodies.circle(
                            size.w / 2,
                            0,
                            circleDiameter / 2,
                            {
                                friction: 0.15,
                                frictionAir: 0.00001,
                                restitution: 0.4,
                                // velocity: { x: 0, y: 0 },
                                angle: Math.random() * Math.PI,
                                label: "circle",
                                render: {
                                    // fill: "red",
                                    fillStyle: 'transparent',
                                    strokeStyle: '#000',
                                    lineWidth: 1,
                                    sprite: {
                                        imgSize: e.width,
                                        texture: e.src,
                                        xScale: scale,
                                        yScale: scale,

                                    }
                                }
                            }
                        );
                        Composite.add(engine.world, circle);
                        // e.remove();
                    })
                }
                // console.log(Composite.allBodies(engine.world));
            }

            //on resize
            function scaleBodies() {
                const allBodies = Composite.allBodies(engine.world);
                allBodies.forEach((body) => {
                    // console.log(body);
                    if (body.label === "circle" && body.isStatic !== true) {
                        var { min, max } = body.bounds;
                        var bodyWidth = max.x - min.x;
                        let scaleSizeA = bodyWidth / body.render.sprite.imgSize;
                        let scaleA = Math.min(scaleSizeA, scaleSizeA);
                        let scaleFactorA =
                            (size.w * SVG_CIRCLE_WIDTH) /
                            bodyWidth;
                        Body.scale(body, scaleFactorA, scaleFactorA);
                        body.render.sprite.xScale = body.render.sprite.yScale = scaleA;
                    }
                    // don't scale walls and ground
                    // if (body.isStatic === true && body.label == "wall") return;
                });
            }
            function handleResize(matterContainer) {
                size.w = matterContainer.clientWidth;
                size.h = matterContainer.clientHeight;
                //resize canvas
                render.canvas.width = size.w;
                render.canvas.height = size.h;
                // reposition ground
                Body.setPosition(ground, Vector.create(size.w / 2, size.h + size.offset / 2));
                // reposition left wall
                Body.setPosition(leftWall, Vector.create(0 - size.offset / 2, size.h / 2));
                // reposition right wall
                Body.setPosition(rightWall, Vector.create(size.w + size.offset / 2, size.h / 2));
                //scale elements
                scaleBodies();
            }
            window.addEventListener("resize", () => handleResize(matterContainer));
        }
    }



    let dropMatterSec = document.querySelectorAll('.brand-drop-box');
    dropMatterSec.forEach(eachSec => {
        let circleClass = '.brand-circle-img';
        ScrollTrigger.create({
            trigger: eachSec,
            start: "top 65%",
            // scroller: isDekstop ? page_container : window,
            onEnter: () => {
                dropMatter(eachSec, circleClass)
            }
        })
    })

    // dropMatter(document.getElementById('container'), '.circles')
});

