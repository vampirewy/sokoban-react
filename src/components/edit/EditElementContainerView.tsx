import EditELementView from "@/components/edit/EditElementView";
import { useEditElement } from "@/composables/edit/editElement";
import { useEditMap } from "@/composables/edit/editMap";
import { ChangeEvent, useEffect, useMemo } from "react";

export default function EditElementView() {
  const { initEditMap, updateMapRow, updateMapCol, setCol, setRow, storeCol, storeRow, storeMap } = useEditMap();
  const {
    floorEditElement,
    wallEditElement,
    playerEditElement,
    cargosEditElement,
    targetsEditElement,
    storeCurrentEditElement,
  } = useEditElement();

  const currentElement = useMemo(() => {
    if (!storeCurrentEditElement.name) return "未选择";
    return storeCurrentEditElement.name;
  }, [storeCurrentEditElement]);

  function handleRow(e: ChangeEvent<HTMLInputElement>) {
    setRow(e.target.value);
  }

  function handleCol(e: ChangeEvent<HTMLInputElement>) {
    setCol(e.target.value);
  }

  useEffect(() => {
    initEditMap();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!storeRow) return;
    if (storeMap.length) {
      timer = setTimeout(() => {
        updateMapRow();
      }, 500);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [storeRow, storeMap]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!storeCol) return;
    if (storeMap.length) {
      setTimeout(() => {
        updateMapCol();
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [storeCol, storeMap]);

  return (
    <div>
      <h3>元素选择区</h3>
      <div className="m-2">
        行:
        <input type="text" className="border border-black" value={storeRow} onChange={(e) => handleRow(e)} />
      </div>
      <div className="m-2">
        列:
        <input type="text" className="border border-black" value={storeCol} onChange={(e) => handleCol(e)} />
      </div>

      <div className="flex space-x-2">
        <h3>地图:</h3>
        <EditELementView editElement={{ name: floorEditElement.name, img: floorEditElement.img }}></EditELementView>
        <EditELementView editElement={{ name: wallEditElement.name, img: wallEditElement.img }}></EditELementView>
      </div>
      <div className="flex space-x-2">
        <h3>玩家:</h3>
        <EditELementView editElement={{ name: playerEditElement.name, img: playerEditElement.img }}></EditELementView>
      </div>
      <div className="flex space-x-2">
        <h3>箱子:</h3>
        <EditELementView editElement={{ name: cargosEditElement.name, img: cargosEditElement.img }}></EditELementView>
      </div>
      <div className="flex space-x-2">
        <h3>放置点:</h3>
        <EditELementView editElement={{ name: targetsEditElement.name, img: targetsEditElement.img }}></EditELementView>
      </div>
      <div className="flex space-x-2">
        <h3>当前选择: {currentElement} </h3>
      </div>
    </div>
  );
}
