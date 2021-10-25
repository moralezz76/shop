<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Throwable
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    /*public function render($request, Throwable $exception)
    {


            //return parent::render($request, $exception);
    }*/

    public function render($request, Throwable $e)
    {
        //if ($request->ajax() || $request->wantsJson()) {

        return parent::render($request, $e);
        return response()->json(
            $this->getJsonMessage($e),
            $this->getExceptionHTTPStatusCode($e)
        );
        /*}
        return parent::render($request, $e);*/
    }

    protected function getJsonMessage($e)
    {
        // You may add in the code, but it's duplication
        return [
            'status' => 0,
            'message' => $e->getMessage()
        ];
    }

    protected function getExceptionHTTPStatusCode($e)
    {
        // Not all Exceptions have a http status code
        // We will give Error 500 if none found
        return method_exists($e, 'getStatusCode') ?
            $e->getStatusCode() : 500;
    }
}
