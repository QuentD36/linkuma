<?php

namespace App\Jobs;

use App\Events\UpdateUrl;
use App\Models\Url;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CheckIndexation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $url;

    /**
     * Create a new job instance.
     */
    public function __construct(Url $url)
    {
        $this->url = $url;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try{

            logger()->info(config('services.spaceserp.api_key'));

            $http = new \GuzzleHttp\Client([
                'verify' => false
            ]);
            $url = "https://api.spaceserp.com/google/search";
            $params = [
                'apiKey' => config('services.spaceserp.api_key'),
                'q' => 'site:'.$this->url->url,
            ];

            $response = $http->request('GET', $url, [
                'query' => $params
            ]);

            $body = json_decode($response->getBody());

            logger()->info(print_r($body, true));

            if(isset($body->organic_results) && count($body->organic_results) > 0){
                $this->url->status = 'success';
            }else{
                $this->url->status = 'failed';
            }

            $this->url->save();

            UpdateUrl::dispatch($this->url->search);

        }catch(\Exception $exception){
            logger()->error($exception->getMessage());
            $this->url->status = 'error';
            $this->url->save();
            UpdateUrl::dispatch($this->url->search);
        }
    }
}
