export default function AddressInputs({
  addressProps,
  setAddressProp,
  disabled = false,
}) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <label className="text-orange-400">Номер Телефона</label>
      <input
        className="text-black"
        disabled={disabled}
        type="tel"
        placeholder="Номер телефона"
        value={phone || ""}
        onChange={(ev) => setAddressProp("phone", ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-orange-400">Адрес улицы</label>
          <input
            className="text-black"
            disabled={disabled}
            type="text"
            placeholder="Адресс "
            value={streetAddress || ""}
            onChange={(ev) => setAddressProp("streetAddress", ev.target.value)}
          />
        </div>
        <div>
          <label className="text-orange-400">Страна</label>
          <input
            className="text-black"
            disabled={disabled}
            type="text"
            placeholder="Страна"
            value={country || ""}
            onChange={(ev) => setAddressProp("country", ev.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="text-orange-400">Почтовый индекс</label>
        <input
          className="text-black"
          disabled={disabled}
          type="text"
          placeholder="Почтовый индекс"
          value={postalCode || ""}
          onChange={(ev) => setAddressProp("postalCode", ev.target.value)}
        />
      </div>
      <div>
        <label className="text-orange-400">Город</label>
        <input
          className="text-black"
          disabled={disabled}
          type="text"
          placeholder="Город"
          value={city || ""}
          onChange={(ev) => setAddressProp("city", ev.target.value)}
        />
      </div>
    </>
  );
}
