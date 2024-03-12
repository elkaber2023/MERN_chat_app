const GenderCheckbox = ({onCheckboxChange,selectToGender}) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer ${selectToGender ==="male"?"selected":""}`}>
          <span className="label-text">Male</span>
          <input type="checkbox" className="checkbox border-slate-900"
          checked={selectToGender === "male"}
          onChange={()=>{onCheckboxChange("male")}}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer ${selectToGender ==="female"?"selected":""}`}>
          <span className="label-text">Female</span>
          <input type="checkbox" className="checkbox checkbox-secondary" 
           checked={selectToGender === "female"}
           onChange={()=>{onCheckboxChange("female")}}
           />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
