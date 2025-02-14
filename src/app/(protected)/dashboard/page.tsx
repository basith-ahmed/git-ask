"use client"
import useProject from '@/hooks/use-project'
import { useUser } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
    const {user} = useUser();

   const {project} = useProject()
  return (
    <div>{project?.name}</div>
  )
}

export default Dashboard