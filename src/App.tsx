import {lazy, Suspense} from 'react'
import {ErrorBoundary, type FallbackProps} from 'react-error-boundary'
import {Outlet, Route, Routes} from 'react-router'
import {LoadingOrError} from '@/components/LoadingOrError'
// import {Gallery} from '@/pages/Gallery'

const Details = lazy(async () =>
	import('@/pages/Details').then(m => ({default: m.Details}))
)

function renderError({error}: FallbackProps) {
	return <LoadingOrError error={error} />
}

export function App() {
	console.log('in App ')
	return (
		<ErrorBoundary fallbackRender={renderError}>
			<Suspense fallback={<LoadingOrError />}>
			<Outlet />
				{/* <Routes>
					<Route element={<Gallery />} index={true} />
					<Route element={<Details />} path=':fruitName' />
				</Routes> */}
			</Suspense>
		</ErrorBoundary>
	)
}

/**
 * App은 아마도 Outlet을 리턴하게 될 듯
 * routes.ts를 작성하고 main은 index.html 처럼 동작
 * routes에서 index될 페이지를 지정하자.
 * 
 * -----------페이지 구성---------
 * GNB
 * 자기소개 페이지 : home
 * 컴포넌트 페이지 : components
 */