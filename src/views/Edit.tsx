import EditElementContainerView from "@/components/edit/EditElementContainerView";
import EditMapView from "@/components/edit/EditMap";
import { EditPlayerView } from "@/components/edit/EditPlayer";

export default function EditView() {
  return (
    <div>
      <div className="flex">
        <div className=" w-4/6 bg-pink-400">
          <EditMapView></EditMapView>
          <EditPlayerView></EditPlayerView>
        </div>
        <div>数据展示区</div>
      </div>
      <EditElementContainerView></EditElementContainerView>
    </div>
  );
}
