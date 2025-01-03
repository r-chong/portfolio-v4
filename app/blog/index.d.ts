import { Route, StaticRoute } from 'nextjs-routes';
type AyushCool = Route | StaticRoute<'/'> | Omit<Route, 'pathname'>;

// import { AyushCool } from './index.d.ts';

export default AyushCool;