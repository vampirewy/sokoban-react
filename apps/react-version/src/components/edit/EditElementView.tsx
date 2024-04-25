import { useEditElement } from '@/composables/edit/editElement';
import { type StoreEditElement } from '@/store/features/EditElement';

interface Props {
  editElement: StoreEditElement;
}
export default function EditELementView({ editElement }: Props) {
  const { setCurrentEditElement } = useEditElement();

  function handleClick(editElement: StoreEditElement) {
    setCurrentEditElement(editElement);
  }

  return (
    <div
      className="m-2"
      onClick={() => handleClick(editElement)}
    >
      <img
        src={editElement.img}
        alt=""
      />
    </div>
  );
}
