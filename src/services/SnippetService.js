import http from "../http-common";

const getAll = () => {
  return http.get("/snippets");
};

const get = id => {
  return http.get(`/snippets/${id}`);
};

const create = data => {
  return http.post("/snippets", data);
};

const update = (id, data) => {
  return http.put(`/snippets/${id}`, data);
};

const remove = id => {
  return http.delete(`/snippets/${id}`);
};

const removeAll = () => {
  return http.delete(`/snippets`);
};

const findByTitle = title => {
  return http.get(`/snippets?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};