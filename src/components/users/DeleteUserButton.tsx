'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function DeleteUserButton({ userId }: { userId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this user?')) {
      setIsDeleting(true)
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          router.refresh()
        } else {
          console.error('Failed to delete user')
        }
      } catch (error) {
        console.error('Error:', error)
      }
      setIsDeleting(false)
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      variant="destructive"
      size="sm"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
  )
}

