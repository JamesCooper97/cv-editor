// utils/storage.js

const STORAGE_KEY = "cv-editor-data";

export const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  const data2 = localStorage.getItem(STORAGE_KEY);
  console.log(data2);
};

export const loadData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  console.log(data);
  return data
    ? JSON.parse(data)
    : { sections: [], skills: [], certifications: [] };
};
