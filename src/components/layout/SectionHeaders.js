export default function SectionHeaders({ subHeader, mainHeader}) {
  return (
    <div className="text-center mb-4">
          <h3 className="text-blue-600 font-semibold leading-4">
        { subHeader }
          </h3>
      <h2 className="text-orange-500 font-bold text-4xl italic"> {mainHeader }</h2>
        </div>
  );
}