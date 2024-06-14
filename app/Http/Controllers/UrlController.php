<?php

namespace App\Http\Controllers;

use App\Events\UpdateUrl;
use App\Jobs\CheckIndexation;
use App\Models\Search;
use App\Models\Url;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UrlController extends Controller
{
    public function index()
    {
        $urls = Url::all();

        return Inertia::render('Home', [
            'urls' => $urls
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'urlsArray' => 'array|required',
            'urlsArray.*' => 'required|url',
        ]);

        $search = new Search();
        $search->save();

        $urls = $request->urlsArray;

        foreach ($urls as $url) {
            $new_url = new Url();
            $new_url->url = $url;
            $new_url->search()->associate($search);
            $new_url->save();

            CheckIndexation::dispatch($new_url)->onQueue('default');
        }

        return redirect()->route('show', ['search' => $search->id]);
    }

    public function show( Search $search ){

        return Inertia::render('Checker', [
            'urls' => $search->urls
        ]);
    }
}
