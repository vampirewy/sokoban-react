import EditELementView from "@/components/edit/EditElementView";
import { useEditElement } from "@/composables/edit/editElement";
import { useEditMap } from "@/composables/edit/editMap";
import { useEffect, useMemo } from "react";

export default function EditElementView() {
  const { initEditMap } = useEditMap();
  const { floorEditElement, wallEditElement, playerEditElement, storeCurrentEditElement } = useEditElement();

  const currentElement = useMemo(() => {
    if (!storeCurrentEditElement.name) return "未选择";
    return storeCurrentEditElement.name;
  }, [storeCurrentEditElement]);

  useEffect(() => {
    initEditMap();
  }, []);

  return (
    <div>
      <h3>元素选择区</h3>
      {/* TODO: 添加行和列 */}

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
        <h3>当前选择: {currentElement} </h3>
      </div>
    </div>
  );
}
