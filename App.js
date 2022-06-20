import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ColorMatrix, Line, Canvas, Circle, Group, BackdropFilter, Paint, LinearGradient, vec, RoundedRect, usePaintRef, Blur } from "@shopify/react-native-skia";

const r = 64;

const App = () => {

  const [state, setState] = useState({ width: 0, height: 0 });
  const paint = usePaintRef();

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
              1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 8, -4,
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
          x={(state.width / 2) - (800 / 2)}
          y={(state.height / 2) - (64 / 2)}
          width={800}
          height={64}
          r={25}
          color="#19162C"
          opacity={0.3}  
        >
          <BackdropFilter
            clip={{ x: (state.width / 2) - (800 / 2), y: (state.height / 2) - (64 / 2), width: 800, height: 64 }}
            filter={<Blur blur={20} />}
          />
        </RoundedRect>
      </Canvas>
    </View>
  );
};

export default App;
