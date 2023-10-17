"use client";

import { useAuthContext } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut as firebaseSignOut } from '@/firebase/auth';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from '@/components/ui/use-toast';
import ModeToggle from '@/components/mode-toggle';
import { Label } from '@/components/ui/label';

export default function Home() {
  const { toast } = useToast();
  const { user } = useAuthContext() as { user: any };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user == null) {
      redirect('sign-in')
    }
  }, [user]);


  const coppyAccessToken = async (force = false) => {
    setIsLoading(true);

    const accessToken = await user.getIdToken(force);
    toast({
      title: "Coppy access token is successfully.",
    })
    console.log(accessToken);
    navigator.clipboard.writeText(accessToken);

    setIsLoading(false);
  }

  const signOut = async () => {
    await firebaseSignOut();
  }

  return (
    <section className='flex flex-col space-y-5 items-center'>
      <Label htmlFor="text">{user?.email}</Label>

      <Button variant="outline" disabled={isLoading} onClick={() => coppyAccessToken()}>
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Copy access token
      </Button>

      <Button variant="outline" disabled={isLoading} onClick={() => coppyAccessToken(true)}>
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Force copy access token
      </Button>

      <div className='flex flex-row space-x-2'>
        <Button variant="outline" disabled={isLoading} onClick={() => signOut()}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Sign Out
        </Button>

        <ModeToggle />
      </div>
    </section>
  )
}
