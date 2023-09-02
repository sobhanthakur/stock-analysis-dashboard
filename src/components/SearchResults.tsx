const SearchResults: React.FC<{
  results: any;
}> = ({ results }) => {
  return (
    <div className="dropdown-container mt-1">
      {results.map((item: any) => {
        return (
          <div key={item.symbol} className={`p-1 m-1 dropdown-list`}>
            <span>{item.symbol}</span> {' - '}
            <span>{item.description}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
