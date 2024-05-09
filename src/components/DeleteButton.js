import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
        <div className="bg-white p-4 rounded-lg">
          <div>Ты уверен, что хочешь удалить?</div>
          <div className="flex gap-2 mt-1">
            <button
              className="button-change"
              onClick={() => setShowConfirm(false)}
            >
              Отмена
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="button-delete"
            >
              Да,&nbsp;удалить!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="button-delete"
      onClick={() => setShowConfirm(true)}
    >
      {label}
    </button>
  );
}
