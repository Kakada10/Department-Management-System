import 'package:client_app/components/qr_overlay.dart';
import 'package:client_app/pages/course_screen.dart';
import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

class ScannerPage extends StatelessWidget {
  const ScannerPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('QR Scanner'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => const SessionScreen()));
          },
        ),
      ),
      body: Stack(
        children: [
          MobileScanner(
          // fit: BoxFit.contain,
          onDetect: (capture) {
            final List<Barcode> barcodes = capture.barcodes;
            final image = capture.image;
            for (final barcode in barcodes) {
              debugPrint('Barcode found! ${barcode.rawValue}');
            }
          },
        ),
        QRScannerOverlay(overlayColour: Colors.black.withOpacity(0.5))
        ]),
    );
  }
}
