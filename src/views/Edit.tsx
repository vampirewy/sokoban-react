import EditCargosView from "@/components/edit/EditCargos";
import EditElementContainerView from "@/components/edit/EditElementContainerView";
import EditMapView from "@/components/edit/EditMap";
import { EditPlayerView } from "@/components/edit/EditPlayer";
import EditTargetView from "@/components/edit/EditTargets";
import { useEditCargo } from "@/composables/edit/editCargo";
import { useEditTarget } from "@/composables/edit/editTarget";

export default function EditView() {
  const { storeCargos } = useEditCargo();
  const { storeTargets } = useEditTarget();

  return (
    <div>
      <div className="flex">
        <div className=" w-4/6 bg-pink-400">
          <EditMapView></EditMapView>
          <EditPlayerView></EditPlayerView>

          {storeCargos.map((cargo) => (
            <EditCargosView key={cargo.id} cargo={cargo}></EditCargosView>
          ))}

          {storeTargets.map((target) => (
            <EditTargetView key={target.id} target={target}></EditTargetView>
          ))}
        </div>
        <div>数据展示区</div>
      </div>
      <EditElementContainerView></EditElementContainerView>
    </div>
  );
}
