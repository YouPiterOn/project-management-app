//import { Spinner } from '../components/Spinner';

export function LoadingPage() {
  return (
    <div className='max-w-3xl mx-auto flex items-center text-center mb-12'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight mb-4'>Loading...</h1>
        <p className='text-xl text-muted-foreground'>Please wait while we load your content.</p>
      </div>
    </div>
  );
}
