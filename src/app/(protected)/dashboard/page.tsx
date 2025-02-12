"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
    const {user} = useUser();
  return (
    <div>{user?.firstName}</div>
  )
}

export default Dashboard