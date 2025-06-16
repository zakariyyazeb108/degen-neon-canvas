
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

const GraphicsPortfolio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navigation />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <Link to="/#portfolio" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
            <h1 className="text-4xl md:text-6xl font-light mb-6">
              <span className="gradient-text font-medium">Graphics</span> Packs
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Complete visual packages that provide brands with everything they need for consistent, professional design
            </p>
          </div>

          {/* Empty State */}
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/20"></div>
              </div>
              <h3 className="text-2xl font-medium text-white/80 mb-2">Coming Soon</h3>
              <p className="text-white/50">Graphics packs will be showcased here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphicsPortfolio;
