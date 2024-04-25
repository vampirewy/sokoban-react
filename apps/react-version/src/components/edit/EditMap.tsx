import { useEditMap } from '@/composables/edit/editMap';

import MapBlockView from './MapBlock';

export default function EditMapView() {
  const { storeMap } = useEditMap();

  return (
    <div>
      {storeMap.map((_row, i) => {
        return (
          <div
            key={i}
            className="flex"
          >
            {storeMap[i].map((_col, j) => {
              return (
                <MapBlockView
                  key={j}
                  x={j}
                  y={i}
                ></MapBlockView>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
