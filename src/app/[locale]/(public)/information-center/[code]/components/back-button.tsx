'use client'
import { useRouter } from '@/lib/i18n/navigation'
import { Button } from '@nextui-org/button'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import React from 'react'

type Props = {}

const BackButton = (props: Props) => {
    const Router = useRouter()
    return (
        <Button onClick={() => Router.back()} isIconOnly variant="light">
            <CircleArrowRight strokeWidth={1.2} className="~md/lg:~size-5/6 ltr:hidden" />
            <CircleArrowLeft strokeWidth={1.2} className="~md/lg:~size-5/6 rtl:hidden" />
        </Button>
    )
}

export default BackButton