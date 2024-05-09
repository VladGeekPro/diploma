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
              style={{
                background:
                  "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "20px",
                border: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "bold",
              }}
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
