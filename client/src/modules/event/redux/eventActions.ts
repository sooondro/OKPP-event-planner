/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppDispatch, AppThunk } from 'modules/redux-store';
import {
  fetchAllEventsPending,
  fetchAllEventsFulfilled,
  fetchAllEventsRejected,
  EventData,
} from 'modules/event';

import { Event } from 'models';
import { API } from 'fixtures';
import { createAsyncThunk } from '@reduxjs/toolkit';

const allEventsEndPoint = '/fetch-all';
const fetchEventByIdEndpoint = '/api/event/fetch-one.json';
const fetchAllFutureEvents = '/api/event/fetch-all-future-events.json';
const createEventEndpoint = '/api/event/create';
const editEventEndpoint = '/api/event/edit-event.json';
const deleteEventEndpoint = '/api/event/delete-event.json';
const fetchUsersEventsEndpoint = '/api/event/fetch-users-events.json';

export const getAllAvailableEvents =
  (): AppThunk => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchAllEventsPending());
      const response = await API.get(allEventsEndPoint);
      const data: Event[] = response.data;
      dispatch(fetchAllEventsFulfilled(data));
    } catch (error) {
      dispatch(fetchAllEventsRejected(error));
    }
  };

export const postEvent = createAsyncThunk(
  'event/postEvent',
  async (event: EventData) => {
    try {
      const response = await API.post(createEventEndpoint, event, {
        headers: { Authorization: `Bearer ${event.token}` },
      });
      const data = response.data;
      console.log('event response', data);
    } catch (error) {
      throw new Error('didnt send event');
    }
  },
);

/*

API.delete(`users/${this.state.id}`);
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const bodyParameters = {
   key: "value"
};

Axios.post( 
  'http://localhost:8000/api/v1/get_token_payloads',
  bodyParameters,
  config
).then(console.log).catch(console.log);
`https://event-planner-5fa62-default-rtdb.europe-west1.firebasedatabase.app/
const fetchEventByIdEndpoint = '/api/event/f${userId}.json?auth=` +token';


*/
