package com.democrazy;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebStorage.QuotaUpdater;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;

public class DemocrazyActivity extends Activity {
    private WebView webview, childView=null;
    private LinearLayout parentLayout;

	/** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        this.requestWindowFeature(Window.FEATURE_NO_TITLE);

        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        
        setContentView(R.layout.main);
        parentLayout = (LinearLayout) findViewById(R.id.LinearLayoutMainDemocrazy);
        webview = (WebView) findViewById(R.id.WebViewMainDemocrazy);
        webview.getSettings().setJavaScriptEnabled(true);
        webview.setWebViewClient(new FaceBookClient());
        webview.setWebChromeClient(new MyChromeClient());
        webview.getSettings().setJavaScriptEnabled(true);
        webview.getSettings().setDatabaseEnabled(true);
        String databasePath = this.getApplicationContext().getDir("database", Context.MODE_PRIVATE).getPath(); 
        webview.getSettings().setDatabasePath(databasePath);
        webview.getSettings().setDomStorageEnabled(true);

        webview.getSettings().setAppCacheEnabled(true);
        webview.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        webview.getSettings().setSupportMultipleWindows(true);
        webview.getSettings().setSupportZoom(true);
        webview.getSettings().setBuiltInZoomControls(false);
        webview.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);

        webview.loadUrl("file:///android_asset/www/index.html");

        
    }
    final class MyChromeClient extends WebChromeClient
    {
        @Override
        public boolean onCreateWindow(WebView view, boolean dialog, boolean userGesture, Message resultMsg) {
            childView = new WebView(DemocrazyActivity.this);
            childView.getSettings().setJavaScriptEnabled(true);
            childView.getSettings().setSupportZoom(true);
            childView.getSettings().setBuiltInZoomControls(true);
            childView.setWebViewClient(new FaceBookClient());
            childView.setWebChromeClient(this);
            childView.setLayoutParams(new LinearLayout.LayoutParams(LayoutParams.FILL_PARENT,LayoutParams.FILL_PARENT));


            parentLayout.addView(childView);


            childView.requestFocus();
            webview.setVisibility(View.GONE);

              /*I think this is the main part which handles all the log in session*/
            WebView.WebViewTransport transport =(WebView.WebViewTransport)resultMsg.obj;
            transport.setWebView(childView);
            resultMsg.sendToTarget();
            return true;
        }


        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            DemocrazyActivity.this.setProgress(newProgress*100);
        }

        @Override
        public void onCloseWindow(WebView window) {
            parentLayout.removeViewAt(parentLayout.getChildCount()-1);
            childView =null;
            webview.setVisibility(View.VISIBLE);
            webview.requestFocus();
        }


		@Override
		public void onExceededDatabaseQuota(String url,
				String databaseIdentifier, long currentQuota,
				long estimatedSize, long totalUsedQuota,
				QuotaUpdater quotaUpdater) 
		{
//			super.onExceededDatabaseQuota(url, databaseIdentifier, currentQuota,
//					estimatedSize, totalUsedQuota, quotaUpdater);
//			
//			
			quotaUpdater.updateQuota(5 * 1024 * 1024); 
		        
		}
        
        
        
        
		
        
    }

        private class FaceBookClient extends WebViewClient{
         @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            Log.i("REQUEST URL",url);
            return false;
        }   
    }

        @Override
        public void onBackPressed() {
        if(childView != null && parentLayout.getChildCount()==2){
            childView.stopLoading();
            parentLayout.removeViewAt(parentLayout.getChildCount()-1);
            if(webview.getVisibility() == View.GONE)
                webview.setVisibility(View.VISIBLE);
        }else{          
            super.onBackPressed();
        }
    }
}