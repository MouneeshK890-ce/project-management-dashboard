import { readFileAsDataUrl } from '../utils/helpers';

export default function ImagePicker({
  label,
  value,
  onChange,
  multiple = false,
}) {
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const urls = await Promise.all(files.map(readFileAsDataUrl));
    onChange(multiple ? urls : urls[0]);
  };

  return (
    <div className="form-group">
      <label>{label}</label>

      {multiple ? (
        <>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

          {Array.isArray(value) && value.length > 0 ? (
            <div className="thumbnail-row">
              {value.map((item, index) => (
                <img
                  key={`${item}-${index}`}
                  src={item}
                  alt={`Preview ${index + 1}`}
                  className="thumbnail"
                />
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className="single-image-picker">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <div className="preview-box">
            {value ? (
              <img src={value} alt="Preview" className="preview-image" />
            ) : (
              <span className="preview-placeholder">No image</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}