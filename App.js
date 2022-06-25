import React, { useState } from 'react';
import { View, Button } from 'react-native';
import {
  ColorMatrix,
  useClockValue,
  useDerivedValue,
  Canvas,
  Circle,
  Group,
  BackdropFilter,
  Paint,
  LinearGradient,
  vec,
  RoundedRect,
  usePaintRef,
  Blur,
  useSpring,
  runSpring,
  useValueEffect,
  useValue,
  BlurMask,
  RadialGradient
} from "@shopify/react-native-skia";

const r = 64;
const interval = 2500;

const App = () => {

  /* check useCanvas */
  const [state, setState] = useState({ width: 0, height: 0 });
  const paint = usePaintRef();

  const clock = useClockValue();
  const opacity = useDerivedValue(
    () => {
      return (clock.current % interval) / interval;
    },
    [clock]
  );

  const [toggled, setToggled] = useState(false);
  const position = useSpring(toggled ? (state.height / 2) - (64 / 2) - 24 : 126, { velocity: 300, mass: 4, damping: 40 });

  const loop = () => runSpring(position, 100);

  return (
    <View onLayout={event => setState(event.nativeEvent.layout)} style={{ backgroundColor: '#19162C', height: '100%', width: '100%' }} >
      <Canvas style={{ flex: 1 }} >
        <Circle cx={state.width / 2} cy={state.height / 5.3} r={r}>
          <LinearGradient
            start={vec((state.width / 2) - r, state.height / 5)}
            end={vec((state.width / 2) + r, (state.height / 5) + r)}
            colors={["magenta", '#19162C']}
          />
        </Circle>

        <Paint ref={paint}>
          <ColorMatrix
            matrix={[
              1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 8, -6,
            ]}
          >
            <Blur blur={14} />
          </ColorMatrix>
        </Paint>
        <Group blendMode='multiply' layer={paint} >
          <Circle cx={state.width / 2} cy={(state.height / 2) - r} r={r} color='cyan' />
          <Circle cx={(state.width / 2) + (r / 2)} cy={state.height / 2} r={r} color="magenta" />
          <Circle cx={(state.width / 2) - (r / 2)} cy={state.height / 2} r={r} color="yellow" />
        </Group>

        <Circle cx={state.width / 2} cy={state.height - (state.height / 4)} r={r}>
          <Paint opacity={0.7} color="#EC4899" >
            <LinearGradient
              start={vec((state.width / 2) - r, state.height - (state.height / 4))}
              end={vec((state.width / 2) + r, state.height - (state.height / 4) + r)}
              colors={["magenta", '#19162C']}
            />
          </Paint>
          <Paint color="black" opacity={0.2} style="stroke" strokeWidth={20} />
          <Paint color="white" style='stroke' strokeWidth={10 / 2} >
            <LinearGradient
              start={vec((state.width / 2) - r, state.height - (state.height / 4))}
              end={vec((state.width / 2) + r, state.height - (state.height / 4) + r)}
              colors={["magenta", '#19162C']}
            />
          </Paint>
        </Circle>

        <RoundedRect
          x={(state.width / 2) - (440 / 2)}
          y={position}
          width={440}
          height={64}
          r={25}
        >
          <RoundedRect
            x={(state.width / 2) - (440 / 2)}
            y={position}
            width={440}
            height={64}
            r={25}
            color="#fff"
            opacity={0.8}
            style='stroke'
          />
          <BackdropFilter
            clip={{ x: (state.width / 2) - (800 / 2), y: (state.height / 2) - (64 / 2) - 24, width: 800, height: 64 }}
            filter={<Blur blur={20} />}
          />
          {/* <LinearGradient
            start={vec((state.width), state.height - (state.height / 4))}
            end={vec((state.width / 2) + r, state.height - (state.height / 4) + r)}
            colors={["magenta", '#19162C']}
          /> */}
          <BlurMask blur={28} style="normal" />
          <RadialGradient
            colors={['#19162C']}
            c={vec((state.width / 2), (state.height / 2))}
            r={state.height * 1}
          />
        </RoundedRect>
      </Canvas>
      <View style={{ marginBottom: 48 }} >
        <Button title="Toggle" color={'white'} onPress={() => setToggled((p) => !p)/* loop() */} />
      </View>
    </View>
  );
};

export default App;
