import { EndpointBuilder } from "@reduxjs/toolkit/query"
import { apiSlice } from "state/features/apiSlice"

const NOTIFICATION_URL: string = '/user'

export const notificationApiSlice = apiSlice.injectEndpoints({
	endpoints: (build: EndpointBuilder<any, any, any>) => ({
		getNotifications: build.query({
			query: () => ({
				url: `${NOTIFICATION_URL}/notifications`,
				method: "GET",
				credentials: "include"
			})
		}),
		markNotificationRead: build.mutation<any, { id?: string, type: string }>({
			query: (data: { id?: string, type: string }) => ({
				url: `${NOTIFICATION_URL}/notifications?isReadType=${data.type}&id=${data.id}`,
				method: "PUT",
				body: data,
				credentials: "include"
			})
		}),
	})
})

export const { useGetNotificationsQuery, useMarkNotificationReadMutation } = notificationApiSlice