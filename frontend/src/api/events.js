import api from "./axios";

export const createEvent = async (eventData) => {
	const response = await api.post("/events/create", eventData);
	return response.data;
};

export const getAllEvents = async (page = 1, limit = 10) => {
	const response = await api.get(`/events/all?page=${page}&limit=${limit}`);
	return response.data;
};

export const approveEvent = async (eventId) => {
	const response = await api.patch(`/events/${eventId}/approve`);
	return response.data;
};

export const rejectEvent = async (eventId) => {
	const response = await api.patch(`/events/${eventId}/reject`);
	return response.data;
};

export const updateEvent = async (eventId, eventData) => {
  const response = await api.patch(`/events/${eventId}`, eventData);
  return response.data;
};
