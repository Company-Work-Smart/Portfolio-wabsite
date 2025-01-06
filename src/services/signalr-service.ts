import * as signalR from '@microsoft/signalr';
import { MyApp } from '@/constant/my-app';

let connection = null;

export const initiateSignalRConnection = async () => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${MyApp.url}/myHub`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.onclose(async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    await startConnection();
  });

  await startConnection();
};

const startConnection = async () => {
  try {
    await connection.start();
    console.log('SignalR Connected.');
  } catch (err) {
    console.log('Error while establishing connection: ', err);
    await new Promise(resolve => setTimeout(resolve, 5000));
    await startConnection();
  }
};

export const getSignalRConnection = () => {
  return connection;
};
